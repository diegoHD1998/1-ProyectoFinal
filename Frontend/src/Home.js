import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

import { Dashboard } from './components/Dashboard';
import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { MiscDemo } from './components/MiscDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';

import { DisplayDemo } from './utilities/DisplayDemo';
import { ElevationDemo } from './utilities/ElevationDemo';
import { FlexBoxDemo } from './utilities/FlexBoxDemo';
import { GridDemo } from './utilities/GridDemo';
import { IconsDemo } from './utilities/IconsDemo';
import { SpacingDemo } from './utilities/SpacingDemo';
import { TextDemo } from './utilities/TextDemo';
import { TypographyDemo } from './utilities/TypographyDemo';
import { TimelineDemo } from './utilities/TimelineDemo';

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
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/home' },
        {
            label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/home/formlayout' },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/home/input' },
                { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/home/floatlabel' },
                { label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "/home/invalidstate" },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/home/button' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/home/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/home/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/home/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/home/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/home/overlay' },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/home/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/home/messages' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/home/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/home/chart' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/home/misc' },
            ]
        },
        {
            label: 'Utilities', icon: 'pi pi-fw pi-globe',
            items: [
                { label: 'Display', icon: 'pi pi-fw pi-desktop', to: '/home/display' },
                { label: 'Elevation', icon: 'pi pi-fw pi-external-link', to: '/home/elevation' },
                { label: 'Flexbox', icon: 'pi pi-fw pi-directions', to: '/home/flexbox' },
                { label: 'Icons', icon: 'pi pi-fw pi-search', to: '/home/icons' },
                { label: 'Grid System', icon: 'pi pi-fw pi-th-large', to: '/home/grid' },
                { label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', to: '/home/spacing' },
                { label: 'Typography', icon: 'pi pi-fw pi-align-center', to: '/home/typography' },
                { label: 'Text', icon: 'pi pi-fw pi-pencil', to: '/home/text' },
            ]
        },
        {
            label: 'Pages', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/home/crud' },
                { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', to: '/home/calendar' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/home/timeline' },
                { label: 'Empty Page', icon: 'pi pi-fw pi-circle-off', to: '/home/empty' }
            ]
        },
        {
            label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
            items: [
                {
                    label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        },
                    ]
                },
                {
                    label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ]
                        },
                        {
                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' }
                            ]
                        }
                    ]
                }
            ]
        },
        { label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => { window.location = "#/documentation" } },
        { label: 'View Source', icon: 'pi pi-fw pi-search', command: () => { window.location = "https://github.com/primefaces/sigma-react" } }
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
                <Route path="/home/formlayout" component={FormLayoutDemo} />
                <Route path="/home/input" component={InputDemo} />
                <Route path="/home/floatlabel" component={FloatLabelDemo} />
                <Route path="/home/invalidstate" component={InvalidStateDemo} />
                <Route path="/home/button" component={ButtonDemo} />
                <Route path="/home/table" component={TableDemo} />
                <Route path="/home/list" component={ListDemo} />
                <Route path="/home/tree" component={TreeDemo} />
                <Route path="/home/panel" component={PanelDemo} />
                <Route path="/home/overlay" component={OverlayDemo} />
                <Route path="/home/menu" component={MenuDemo} />
                <Route path="/home/messages" component={MessagesDemo} />
                <Route path="/home/file" component={FileDemo} />
                <Route path="/home/chart" component={ChartDemo} />
                <Route path="/home/misc" component={MiscDemo} />
                <Route path="/home/display" component={DisplayDemo} />
                <Route path="/home/elevation" component={ElevationDemo} />
                <Route path="/home/flexbox" component={FlexBoxDemo} />
                <Route path="/home/icons" component={IconsDemo} />
                <Route path="/home/grid" component={GridDemo} />
                <Route path="/home/spacing" component={SpacingDemo} />
                <Route path="/home/typography" component={TypographyDemo} />
                <Route path="/home/text" component={TextDemo} />
                <Route path="/home/calendar" component={Calendar} />
                <Route path="/home/timeline" component={TimelineDemo} />
                <Route path="/home/crud" component={Crud} />
                <Route path="/home/empty" component={EmptyPage} />
                <Route path="/home/documentation" component={Documentation} />
            </div>

            <AppFooter />
            <div class="layout-mask"></div>

        </div>
    );

}

export default Home;