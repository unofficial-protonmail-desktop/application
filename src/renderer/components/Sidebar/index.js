import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SettingsIcon from './settings-icon.svg';
import SidebarItem from '../SidebarItem';
import styles from './style.scss';

const Sidebar = ({
  accounts,
  isHidden,
  onChangePosition,
  onRemoveAccount,
  location,
}) =>
  <div className={[styles.container, isHidden && styles.containerHidden].filter(v => !!v).join(' ')}>
    <Link to="/add-account" className={`${styles.tab} add-account`}>
      <div>
        <span>+</span>
      </div>
    </Link>

    <DragDropContext onDragEnd={({ destination, source }) => onChangePosition({ from: source.index, to: destination.index })}>
      <Droppable droppableId="mail-boxes">
        {(provided) => (
          <div ref={provided.innerRef}>
            {accounts
              .map(account => ({ ...account, path: `/mailbox/${account.username}` }))
              .map(account => ({ ...account, isActive: account.path === location.pathname }))
              .map(({ username, unreadEmails, path, isActive }, index) => (
                <Draggable key={username} draggableId={username} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <SidebarItem
                        key={username}
                        href={path}
                        isActive={isActive}
                        onRemoveAccount={onRemoveAccount}
                        unreadEmails={unreadEmails}
                        username={username}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

          </div>
        )}
      </Droppable>
    </DragDropContext>
    <Link
      to="/settings"
      className={[styles.SettingsTab]}
    >
      <img src={SettingsIcon} width={30} />
    </Link>
  </div>;

Sidebar.propTypes = {
  accounts: PropTypes.array.isRequired,
  isHidden: PropTypes.bool.isRequired,
  onChangePosition: PropTypes.func.isRequired,
  onRemoveAccount: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default Sidebar;
