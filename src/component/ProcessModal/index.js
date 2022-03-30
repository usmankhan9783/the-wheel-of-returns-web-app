import './processModal.scss';

export function ProcessModal({ isOpen, message }) {
    if (isOpen)
        return (
            <div className={`modal-container ${isOpen && "isOpen"}`} id="modal-opened">
                <div className="modal">
                    <div className="modal__details">
                        <h1 className="modal__title">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ margin: "auto", background: "transparent", display: "block" }} width="160px" height="160px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                <g transform="translate(50 50)"><g transform="scale(1)">
                                    <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(0 0 0)" stroke="none" fill="#93dbe9"></path>
                                    <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.875s"></animateTransform>
                                </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(45 0 0)" stroke="none" fill="#689cc5"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(90 0 0)" stroke="none" fill="#5e6fa3"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.625s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(135 0 0)" stroke="none" fill="#3b4368"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(180 0 0)" stroke="none" fill="#93dbe9"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.375s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(225 0 0)" stroke="none" fill="#689cc5"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(270 0 0)" stroke="none" fill="#5e6fa3"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="-0.125s"></animateTransform>
                                    </g><g transform="scale(1)">
                                        <path d="M0 0L0 -40A40 40 0 0 1 28.2842712474619 -28.284271247461902" transform="rotate(315 0 0)" stroke="none" fill="#3b4368"></path>
                                        <animateTransform attributeName="transform" type="scale" values="1;0.5" keyTimes="0;1" dur="1s" repeatCount="indefinite" begin="0s"></animateTransform>
                                    </g></g>
                            </svg>
                        </h1>
                        <p className="modal__description">{message}</p>
                    </div>
                </div>
            </div>
        )
    else return null
}
