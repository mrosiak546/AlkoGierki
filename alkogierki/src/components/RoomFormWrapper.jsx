import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RoomFormWrapper = ({ title, icon, children }) => {
    return (
        <div className="home-wrapper d-flex flex-column justify-content-center align-items-center">
            <h1 className="title mb-4" style={{ fontSize: "2.1rem" }}>{title}</h1>
            <FontAwesomeIcon icon={icon} className="mb-4 mt-4" style={{ fontSize: "4rem" }} />
            <div className="d-flex flex-column mt-5 gap-3 w-100 px-4" style={{ maxWidth: '400px' }}>
                {children}
            </div>
        </div>
    )
}

export default RoomFormWrapper
