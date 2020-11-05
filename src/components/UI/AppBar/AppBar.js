import React from 'react';
import Search20 from '@carbon/icons-react/lib/search/20';
import Notification20 from '@carbon/icons-react/lib/notification/20';
import AppSwitcher20 from '@carbon/icons-react/lib/app-switcher/20';
import {
    Header,
    HeaderName,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem
} from "carbon-components-react/lib/components/UIShell";

const appBar = () => {

    return (
        <Header aria-label="DPCM Platform">
            <HeaderName href="#" prefix="IBM">
                DPCM Kafka Message Reader
                </HeaderName>
            <HeaderNavigation aria-label="DPCM Platform">
                <HeaderMenu aria-label="Home" menuLinkName="Home">
                    <HeaderMenuItem href="/">Home</HeaderMenuItem>
                </HeaderMenu>
                <HeaderMenu aria-label="Kafka messages" menuLinkName="Kafka messages">
                    <HeaderMenuItem href="/messages">Kafka messages</HeaderMenuItem>
                    {/* <HeaderMenuItem href="/messages/20">Kafka detail</HeaderMenuItem> */}
                    {/* <HeaderMenuItem href="/testReducer">Test Filter Panel</HeaderMenuItem> */}
                </HeaderMenu>
            </HeaderNavigation>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
                    <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications" onClick={() => { }}>
                    <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher" onClick={() => { }}>
                    <AppSwitcher20 />
                </HeaderGlobalAction>
            </HeaderGlobalBar>
        </Header>
    );
}

export default appBar;