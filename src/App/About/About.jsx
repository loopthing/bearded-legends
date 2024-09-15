import Button from '@components/Button';
import Link from '@components/Link';
import Toolbar from '@components/Toolbar';
import GlobalContent from '@content/Global.yaml';
import useContent from '@hooks/useContent';
import * as AnimationStyles from '@styles/Animation.scss';
import DOM from '@utils/DOM';
import Logger from '@utils/Logger';
import React from 'react';
import useZoom from '../../hooks/useZoom';
import Logo from '../Logo';
import * as LogoStyles from '../Logo.scss';
import Navigation from '../Navigation/Navigation';
import * as Styles from './About.scss';
import AboutContent from './About.yaml';

export default function App({ className }) {
  const _logger = new Logger('App');

  const {
    ChatAppLinkUrl,
    ChatAppInvitationLinkUrl,
    ChatAppInvitationMessage,
    ChatAppInvitationLinkLabel,
    ChatAppLinkLabel,
    GuildName,
    GuildNameDecorative,
  } = useContent(GlobalContent, AboutContent);

  useZoom();

  return (
    <>
      <div className={DOM.classNames(className, Styles.About)}>
        <Logo className={DOM.classNames(Styles.Logo, LogoStyles.Largest)} />

        <h1 tabIndex="-1" aria-label={GuildName()}>
          <span aria-hidden="true">{GuildNameDecorative()}</span>
        </h1>

        <div className={Styles.Chat}>
          <Button href={ChatAppLinkUrl()}>{ChatAppLinkLabel()}</Button>

          <p>
            <ChatAppInvitationMessage />

            <br />

            <Link
              href={ChatAppInvitationLinkUrl()}
              className={AnimationStyles.BounceOnHover}
            >
              {ChatAppInvitationLinkLabel()}
            </Link>
          </p>
        </div>
      </div>

      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
