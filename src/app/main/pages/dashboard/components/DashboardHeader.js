import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

function DashboardHeader() {
    const CURRENT_USER = JSON.parse(localStorage.getItem("current_user"));

    return (
        <div className="flex flex-col w-full px-24 sm:px-32 h-256">
            <div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
                <div className="flex flex-auto items-center min-w-0">
                    <Avatar className="flex-0 w-64 h-64 text-black" alt="user_initials">
                        {CURRENT_USER?.displayName}
                    </Avatar>
                    <div className="flex flex-col min-w-0 mx-16">
                        <Typography
                            className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
                            Welcome back, {CURRENT_USER?.displayName}
                        </Typography>

                        <div className="flex items-center">
                            <FuseSvgIcon size={20} color="action">
                                heroicons-solid:adjustments
                            </FuseSvgIcon>
                            <Typography className="mx-6 leading-6 truncate" color="text.secondary">
                                This is an application for coordinating all cinema operations
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <span
                    className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
                    style={{
                        backgroundColor: '#f1f5f9',
                    }}
                >
                    Basic Informations
                </span>
            </div>
        </div>
    );
}

export default DashboardHeader;