import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface UrlParams {
  id?: string;
}

const IndividualFormPage: React.FC<RouteComponentProps<UrlParams>> = ({
  match
}: RouteComponentProps<UrlParams>) => {
  return (
    <div>
      <h1>Individual Form Page</h1>
      <div>{`page id ${match.params.id}`}</div>
    </div>
  );
};

export default IndividualFormPage;
