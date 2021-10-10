import './App.css';
import React from 'react';
import {AvailableSlots} from "./features/CowinAvailableSlots/AvailableSlots";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Home} from "./features/home/Home";

function App() {
  return (
    <BrowserRouter>
        <div className="app">
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading className="navigation-header">VisualizeCoWIN</NavbarHeading>
                    <NavbarDivider />
                    <Link to="/">
                        <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                    </Link>
                    <Link to="/visualize">
                        <Button className={Classes.MINIMAL} icon="chart" text="Visualizations" />
                    </Link>
                    <Link to="/availability">
                        <Button className={Classes.MINIMAL} icon="confirm" text="CoWIN Slot Checker" />
                    </Link>
                </NavbarGroup>
            </Navbar>
            <div className="app-route">
                <Switch>
                    <Route path="/availability">
                        <AvailableSlots />
                    </Route>
                    <Route path="/visualize">
                        <div style={{margin: 20}}>Setup visualizations</div>
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
