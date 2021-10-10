import './App.css';
import React, {useState} from 'react';
import {AvailableSlots} from "./features/CowinAvailableSlots/AvailableSlots";
import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {Home} from "./features/home/Home";
import {Visualizations} from "./features/visualizations/Visualizations";

function App() {
    const [themeButton, setThemeButton] = useState({name: "Dark Theme", icon: "moon"});

    const switchTheme = () => {
        const div = document.getElementById("app");
        if (div.classList.contains("bp4-dark")) {
            div.classList.remove("bp4-dark");
            setThemeButton({name: "Dark Theme", icon: "moon"});
        }
        else if (!div.classList.contains("bp4-dark")) {
            div.classList.add("bp4-dark");
            setThemeButton({name: "Light Theme", icon: "flash"});
        }
    }
    return (
    <BrowserRouter>
        <div id="app">
            <Navbar>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading className="navigation-header">VisualizeCoWIN</NavbarHeading>
                    <NavbarDivider />
                    <NavLink to="/">
                        <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                    </NavLink>
                    <Link to="/visualize">
                        <Button className={Classes.MINIMAL} icon="chart" text="Visualizations" />
                    </Link>
                    <Link to="/availability">
                        <Button className={Classes.MINIMAL} icon="confirm" text="CoWIN Slot Checker" />
                    </Link>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button
                        className={Classes.MINIMAL}
                        icon={themeButton.icon}
                        text={themeButton.name}
                        onClick={switchTheme}
                    />
                </NavbarGroup>
            </Navbar>
            <div className="app-route">
                <Switch>
                    <Route path="/availability">
                        <AvailableSlots />
                    </Route>
                    <Route path="/visualize">
                        <Visualizations />
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
