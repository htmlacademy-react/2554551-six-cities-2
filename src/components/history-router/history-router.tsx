import { PropsWithChildren, useLayoutEffect, useState } from 'react';
import { BrowserHistory } from 'history';
import { Router } from 'react-router-dom';

export type Props = PropsWithChildren<{
  history: BrowserHistory;
  basename?: string;
}>;

const HistoryRouter = ({ history, basename, children }: Props) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};

export default HistoryRouter;
