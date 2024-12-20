import { useSelector } from 'react-redux';
import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user/user.selectors';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
};

export default PrivateRoute;
