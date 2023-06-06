import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Error404 from "./pages/404";
import Layout from './components/Layout';
import Home from "./pages/Home";
import NotWall from "./pages/NotWall";

import './i18n'
import Result from "./pages/Result";
import Test from "./pages/test";
import {Provider} from "./assets/Data";



const loadingMarkup = (
    <div className="animate-ping text-8xl py-4 text-center">
        <p>Loading...</p>
    </div>
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter basename="/products/eurocave/">
        <Provider>
            <React.StrictMode>
                <Suspense fallback={loadingMarkup}>
                    <div className="text-white transition-all duration-500">
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/NotWall" element={<NotWall />} />
                                <Route path="/result" element={<Result />} />
                                <Route path="/test" element={<Test />} />
                                <Route path="*" element={<Error404 />} />
                            </Routes>
                        </Layout>
                    </div>
                </Suspense>
            </React.StrictMode>
        </Provider>
    </BrowserRouter>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
