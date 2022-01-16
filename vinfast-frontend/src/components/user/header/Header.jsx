import React, {useRef, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import { Link, useLocation } from 'react-router-dom';
import cookies from 'react-cookies'

import { logout, selectUser } from '../../../redux/user/userSlice';
import './header.scss';

import logo_main_w from '../../../assets/logo-main-w.svg';
import arrow from '../../../assets/images/arrow.svg'
const headerNav = [
    {
        display: 'Ô tô',
        path: '/vinfast-cars-deposit'
    },
    {
        display: 'Xe máy điện',
        path: '/vinfast-bike'
    },
    {
        display: 'Ưu đãi',
        path: '/uu-dai'
    },
    {
        display: 'Dịch vụ',
        path: '/dich-vu'
    },
    {
        display: 'Blog',
        path: '/blog'
    }
]

const Header = () => {

    const { pathName } = useLocation();
    const headerRef = useRef(null);
    
    const active = headerNav.findIndex( e => e.path === pathName);
    
    const [isCheckheader, setIsCheckheader] = useState(false)
    const [show, setShow] = useState(false)

    const handleClick = (e) => {
        setShow(!show)
    }

    const user = useSelector(selectUser);
    console.log(user)

    const dispatch = useDispatch();
    const handleClickTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
    }
    const handleLogout = ()=> {
        setShow(!show)
        cookies.remove("user")
        dispatch(logout())
    }

    console.log(show)

    let path = <Link to="/login" className="header__right--account">Tài khoản</Link>
    if(user !== null && user !== undefined) {
        path = <>
                <div className='account'>
                    <div onClick={handleClick} className="header__right--account">
                        <img src={`/images/avatars/${user.avatar}.png`} alt="" />
                        {user.name}
                    </div>
                    <ul className={show ? 'account__list active' : 'account__list'}>
                        <li>Thông tin cá nhân</li>
                        <Link to='/new-post'>
                            <li>Viết Blog</li>
                        </Link>
                        <li>Bài viết của tôi</li>
                        <li onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                </div>
            </>
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsCheckheader(true)
            } else {
                setIsCheckheader(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    },[])

    return (
        <>
            <header id="header" ref={headerRef} className={isCheckheader ? 'isCheckheader header' : 'header'}>
                <div className="header__wrap container">
                    <div className="header__left">
                        <div className="header__left--logo" onClick={handleClickTop}>
                            <Link to='/'>
                                <img src={logo_main_w} alt="" />
                            </Link>
                        </div>
                        <ul className="header__left--nav">
                            {
                                headerNav.map((e, i) => (
                                    <li onClick={handleClickTop} key={i} className={`${i === active ? 'active' : ''}`}>
                                        <Link to={e.path}>
                                            {e.display}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="header__right">
                        {path}
                        <div className="header__right--region">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 7C14 10.8675 10.8675 14 7 14C3.13253 14 0 10.8675 0 7C0 3.13253 3.13253 0 7 0C10.8675 0 14 3.13253 14 7ZM7.16867 5.96386C7.22892 5.87952 7.3494 5.89157 7.39759 5.9759C7.43373 6.04819 7.51807 6.09639 7.60241 6.09639H7.68675C7.80723 6.09639 7.91566 6 7.91566 5.86747V3.66265C7.91566 3.49398 7.81928 3.33735 7.66265 3.25301L7.3494 3.10843C7.19277 3.03614 7.18072 2.81928 7.3253 2.72289L8.74699 1.63855C8.19277 1.45783 7.61446 1.3494 7 1.3494C3.89157 1.3494 1.3494 3.87952 1.3494 7C1.3494 7.31325 1.38554 7.60241 1.43374 7.90361H3.20482C3.3253 7.90361 3.44578 7.85542 3.53012 7.77108L4.07229 7.22892C4.18072 7.12048 4.36145 7.14458 4.43374 7.28916L5.07229 8.55422C5.14458 8.71084 5.30121 8.80723 5.46988 8.80723H5.63855C5.89157 8.80723 6.09639 8.60241 6.09639 8.3494V8.09639C6.09639 7.9759 6.04819 7.86747 5.96386 7.77108L5.80723 7.61446C5.72289 7.53012 5.72289 7.38554 5.80723 7.28916L5.96386 7.13253C6.04819 7.04819 6.16867 7 6.27711 7H6.28916C6.44578 7 6.59036 6.91566 6.6747 6.78313L7.16867 5.96386ZM11.5181 9.20482C11.5181 9.08434 11.4699 8.9759 11.3855 8.87952L11.0482 8.54217C11.012 8.50602 10.988 8.44578 10.988 8.38554V8.0241C10.988 7.96386 10.9398 7.91566 10.8795 7.91566H10.6988C10.6506 7.91566 10.6024 7.95181 10.5904 8L10.4699 8.40964C10.4578 8.44578 10.4217 8.48193 10.3614 8.48193H10.253C10.2169 8.48193 10.1687 8.44578 10.1446 8.40964L10 8.04819C9.96386 7.96386 9.87952 7.90361 9.79518 7.90361H9.45783C9.42169 7.90361 9.36145 7.92771 9.3253 7.95181L8.6506 8.43373C8.60241 8.45783 8.55422 8.49398 8.49398 8.50602L7.38554 8.95181C7.30121 8.98795 7.24096 9.07229 7.24096 9.15663V9.44578C7.24096 9.49398 7.26506 9.56627 7.30121 9.60241L7.63855 9.93976C7.72289 10.0241 7.84337 10.0723 7.95181 10.0723H8.24096C8.27711 10.0723 8.31325 10.0723 8.3494 10.0602L8.95181 9.91566C9 9.90361 9.08434 9.89157 9.13253 9.89157C9.3012 9.89157 9.54217 9.98795 9.66265 10.1084L10.0241 10.4819C10.1084 10.5663 10.2289 10.6145 10.3373 10.6145H10.7711C10.8916 10.6145 11.012 10.5663 11.0964 10.4819L11.3614 10.2169C11.4458 10.1325 11.494 10.012 11.494 9.89157V9.20482H11.5181Z" fill="#41454D"></path> </svg>
                            <span className="laguage-vn">VN</span>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="header__right--menu">
                            <div className="nav__icon__region">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="slidebar__right">
                                <ul>
                                    <li>Hệ thống Showroom và Đại lý</li>
                                    <li>Đối tác trạm sạc</li>
                                    <li>Hệ sinh thái pin và trạm sạc</li>
                                    <li>Tin tức</li>
                                    <li>Câu hỏi thường gặp</li>
                                    <li>Liên hệ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div onClick={handleClickTop} className={isCheckheader ? "click__top" : 'hide'}>
            </div>
        </>
    )
}

export default Header
