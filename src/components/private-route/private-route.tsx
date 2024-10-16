import React from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

// Сборка не проходит, если испльзовать PropsWithChildren и не указать тип Navigate
// 'PrivateRoute' cannot be used as a JSX component.
// Its return type 'string | number | boolean | Element | Iterable<ReactNode> | null | undefined' is not a valid JSX element.
// Type 'undefined' is not assignable to type 'Element | null'.

// type Props = PropsWithChildren<{ authorizationStatus: AuthorizationStatus }>;
type Props = {
  authorizationStatus: AuthorizationStatus;
  children: React.JSX.Element;
};

const PrivateRoute = ({ authorizationStatus, children }: Props) =>
  authorizationStatus === AuthorizationStatus.Auth
    ? children
    : ((<Navigate to={AppRoute.Login} />) as React.JSX.Element);

export default PrivateRoute;
