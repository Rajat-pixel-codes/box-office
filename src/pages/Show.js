/* eslint-disable no-underscore-dangle */
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { InfoBlock, ShowPageWrapper } from './Show.Styled';

const reducer = (previousState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isLoading: false, error: null, show: action.show };
    }

    case 'FETCH_FAILED': {
      return { ...previousState, isLoading: false, error: action.error };
    }
    default:
      return previousState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

function Show() {
  const { id } = useParams();
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        setTimeout(() => {
          if (isMounted) {
            dispatch({ type: 'FETCH_SUCCESS', show: results });
          }
        }, 2000);
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error occured!! {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>
          Details
          <Details
            status={show.status}
            network={show.network}
            premiered={show.premiered}
          />
        </h2>
      </InfoBlock>

      <InfoBlock>
        <h2>
          Seasons
          <Seasons seasons={show._embedded.seasons} />
        </h2>
      </InfoBlock>

      <InfoBlock>
        <h2>
          Cast
          <Cast cast={show._embedded.cast} />
        </h2>
      </InfoBlock>
    </ShowPageWrapper>
  );
}

export default Show;
