import './processModal.scss';

export function ProcessModal({ isOpen, message }) {
    if (isOpen)
        return (
            <div className={`modal-container ${isOpen && "isOpen"}`} id="modal-opened">
                <div className="modal">
                    <div className="modal__details">
                        <h1 className="modal__title">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: "auto", background: "rgba(255, 255, 255, 0)" ,display: "block"}} width="141px" height="141px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <g transform="rotate(0 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.9868421052631579s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(22.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.9210526315789473s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(45 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.8552631578947368s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(67.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.7894736842105262s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(90 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.7236842105263157s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(112.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.6578947368421052s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(135 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.5921052631578947s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(157.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.5263157894736842s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(180 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.4605263157894737s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(202.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.3947368421052631s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(225 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.3289473684210526s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(247.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.2631578947368421s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(270 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.19736842105263155s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(292.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.13157894736842105s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(315 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="-0.06578947368421052s" repeatCount="indefinite" />
                                    </rect>
                                </g><g transform="rotate(337.5 50 50)">
                                    <rect x="48" y="17.5" rx="2" ry="3.5700000000000003" width="4" height="17" >
                                        <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1.0526315789473684s" begin="0s" repeatCount="indefinite" />
                                    </rect>
                                </g>
                            </svg>
                        </h1>
                        <p className="modal__description">{message}</p>
                    </div>
                </div>
            </div>
        )
    else return null
}
