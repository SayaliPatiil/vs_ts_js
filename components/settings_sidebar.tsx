// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';

import * as UserAgent from 'utils/user_agent';

export type Tab = {
    icon: string;
    iconTitle: string;
    name: string;
    uiName: string;
}

export type Props = {
    activeTab?: string;
    tabs: Tab[];
    updateTab: (name: string) => void;
}

export default class SettingsSidebar extends React.PureComponent<Props> {
    public handleClick = (tab: Tab, e: React.MouseEvent) => {
        e.preventDefault();
        this.props.updateTab(tab.name);
        (e.target as Element).closest('.settings-modal')?.classList.add('display--content');
    }

    public componentDidMount() {
        if (UserAgent.isFirefox()) {
            document.querySelector('.settings-modal .settings-table .nav')?.classList.add('position--top');
        }
    }

    public render() {
        const tabList = this.props.tabs.map((tab) => {
            const key = `${tab.name}_li`;
            let className = '';
            if (this.props.activeTab === tab.name) {
                className = 'active';
            }

            return (
                <li
                    id={`${tab.name}Li`}
                    key={key}
                    className={className}
                >
                    <button
                        id={`${tab.name}Button`}
                        className='cursor--pointer style--none'
                        onClick={this.handleClick.bind(null, tab)}
                        aria-label={tab.uiName.toLowerCase()}
                    >
                        <i
                            className={tab.icon}
                            title={tab.iconTitle}
                        />
                        {tab.uiName}
                    </button>
                </li>
            );
        });

        return (
            <div>
                <ul
                    id='tabList'
                    className='nav nav-pills nav-stacked'
                >
                    {tabList}
                </ul>
            </div>
        );
    }
}
