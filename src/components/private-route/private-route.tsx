import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type Props = PropsWithChildren<{ authorizationStatus: AuthorizationStatus }>;

const PrivateRoute = ({ authorizationStatus, children }: Props) =>
  authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );

export default PrivateRoute;
