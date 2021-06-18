import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';

import { Dashboard } from './components/Dashboard';
import ResumenVentas from './pages/Informes/ResumenVentas';
import VentasEmpleados from './pages/Informes/VentasEmpleados';
import VentasProductos from './pages/Informes/VentasProductos';
import Productos from './pages/Productos/Productos';
import Categorias from './pages/Productos/Categorias';
import Variantes from './pages/Productos/Variantes';
import Modificadores from './pages/Productos/Modificadores';
import Usuarios from './pages/Usuarios/Usuarios';
import Roles from './pages/Usuarios/Roles';
import Mesas from './pages/Mesas/Mesas';
import Zonas from './pages/Mesas/Zonas';
import FileUploadDemo from './components/subida'



const Home = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const sidebar = useRef();

    const history = useHistory();

    let menuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        }
        else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(prevState => !prevState);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(prevState => !prevState);
            }
        }
        else {
            setMobileMenuActive(prevState => !prevState);
        }
        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }

    const menu = [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/home" },
        {
            label: "Informes",
            icon: "pi pi-fw pi-chart-bar",
            items: [
                { label: "Resumen de Ventas", icon: "pi pi-fw pi-bookmark", to: "/home/resumen-ventas" },
                { label: "Ventas por Empleado", icon: "pi pi-fw pi-bookmark", to: "/home/ventas-empleados" },
                { label: "Ventas por Producto", icon: "pi pi-fw pi-bookmark", to: "/home/ventas-producto" },
            ],
        },
        {
            label: "Productos",
            icon: "pi pi-fw pi-book",
            items: [
                { label: "Lista de Productos", to: "/home/lista-productos" },
                { label: "Categorias", to: "/home/categoria" },
                { label: "Variantes", to: "/home/variantes" },
                { label: "Modificadores", to: "/home/modificadores" },
            ]
        },
        {
            label: "Usuarios",
            icon: "pi pi-fw pi-users",
            items: [
                { label: "Lista de Usuarios",icon:'pi pi-fw pi-user' ,to: "/home/lista-usuarios" },
                { label: "Roles", icon:'pi pi-fw pi-user-minus', to: "/home/roles" },
                
            ]
        },
        {
            label: "Mesas",
            icon: "pi pi-fw pi-table",
            items: [
                { label: "Lista de Mesas" ,to: "/home/lista-mesas" },
                { label: "Zonas", to: "/home/zonas" },
                
            ]
        },
        { label: "Ejemplo", icon: "pi pi-fw pi-home", to: "/home/subida" },
        { label: "Ejemplo2", icon: "pi pi-fw pi-home", to: "/home/123" },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isSidebarVisible = () => {
        if (isDesktop()) {
            if (layoutMode === 'static')
                return !staticMenuInactive;
            else if (layoutMode === 'overlay')
                return overlayMenuActive;
            else
                return true;
        }

        return true;
    }

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenu={onToggleMenu} />

            <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                    <div className="layout-logo" style={{cursor: 'pointer'}} onClick={() => history.push('/home')}>
                        <img alt="Logo" src={logo} />
                    </div>
                    <AppProfile />
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                </div>
            </CSSTransition>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <div className="layout-main">
                <Route path="/home" exact component={Dashboard} />
                {/* Informes */}
                <Route path="/home/resumen-ventas" component={ResumenVentas} />
                <Route path="/home/ventas-empleados" component={VentasEmpleados} />
                <Route path="/home/ventas-producto" component={VentasProductos} />

                {/* Productos */}
                <Route path="/home/lista-productos" component={Productos} />
                <Route path="/home/categoria" component={Categorias} />
                <Route path="/home/variantes" component={Variantes} />
                <Route path="/home/modificadores" component={Modificadores} />

                {/* Usuarios */}
                <Route path="/home/lista-usuarios" component={Usuarios} />
                <Route path="/home/roles" component={Roles} />

                {/* Mesas */}
                <Route path="/home/lista-mesas" component={Mesas} />
                <Route path="/home/zonas" component={Zonas} />



                <Route path="/home/subida" component={FileUploadDemo} />
                
                
            </div>

            <AppFooter />
            <div class="layout-mask"></div>

        </div>
    );

}

export default Home;