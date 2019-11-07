import React, { useState, useEffect, Fragment } from 'react';
import PrismicReact from 'prismic-reactjs';
import NotFound from '../../NotFound';
import './Project.css';

export default ({ prismicCtx, match }) => {
  const [state, setState] = useState({
    doc: null,
    notFound: false,
    fetched: false
  });

  useEffect(() => {
    if (!prismicCtx || state.fetched) return;

    prismicCtx.api.getByUID('projects', match.params.uid, {}, (err, doc) => {
      if (doc) {
        setState({ ...state, doc: doc, fetched: true });
      } else {
        setState({ ...state, notFound: true, fetched: true });
      }
    });
  });

  return (
    <Fragment>
      {!state.fetched && <p>Loading...</p>}

      {state.notFound && <NotFound />}

      {state.doc && (
        <div data-wio-id={state.doc.id}>
          {/* This is how to insert a Rich Text field as plain text */}
          <h1>{PrismicReact.RichText.asText(state.doc.data.title)}</h1>
          {/* This is how to insert a Rich Text field into your template as html */}
          {PrismicReact.RichText.render(
            state.doc.data.description,
            prismicCtx.linkResolver
          )}
        </div>
      )}
    </Fragment>
  );
};
