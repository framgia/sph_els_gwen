import AdminRoute from './AdminRoute';
import AuthAdminRoute from './AuthAdminRoute';
import UserRoute from './UserRoute';
import AuthUserRoute from './AuthUserRoute';

export interface RouteProps {
    path: string,
    element: JSX.Element
}

export {
    AdminRoute,
    AuthAdminRoute,
    UserRoute,
    AuthUserRoute
}