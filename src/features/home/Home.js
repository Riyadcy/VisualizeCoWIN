import React from "react";
import Particles from "react-particles-js";
import "./Home.css"
import {Button, ButtonGroup, Intent} from "@blueprintjs/core";
import {Link} from "react-router-dom";

export function Home() {
    return (
        <div className="animation-container">
            <div className="home">
                <div className="home-content">
                    <span className="home-header">VisualizeCoWIN</span>
                    <p className="home-description">
                        is a Covid-19 Dashboard tool for India which features<br/>
                        data from CoWIN Public API and mygov.in<br/>
                        The slot checking tool features filters and search.
                    </p>
                    <ButtonGroup>
                        <Link to="/dashboard">
                            <Button intent={Intent.SUCCESS} text="Dashboard" />
                        </Link>
                        <Link to="/availability">
                            <Button text="CoWIN Slot Checker" />
                        </Link>
                    </ButtonGroup>
                </div>
            </div>
            <Particles
                canvasClassName="animation"
                params={{
                    "particles": {
                        "number": {
                            "value": 120
                        },
                        "size": {
                            "value": 3
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": "repulse"
                            }
                        }
                    }
                }} />
        </div>
    )
}