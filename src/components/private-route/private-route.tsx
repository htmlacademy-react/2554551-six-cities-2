import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/types/store';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const authorizationStatus = useSelector(
    (state: RootState) => state.authorizationStatus
  );

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
