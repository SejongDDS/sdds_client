// 개발 보류,,, 페이지 적용이 안됐음
import { toggleSidebar } from "../util/toggleSidebar";

function TopNav() {
    const handleClick = () => {
        toggleSidebar(false);
    };
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleClick}
                >
                    <i className="fa fa-bars"></i>
                </button>
                <div className="panel__devices">1</div>
                <div className="panel__editor">2</div>
                <div className="panel__basic-actions">3</div>
            </div>
        </nav>
    );
}

export default TopNav;
