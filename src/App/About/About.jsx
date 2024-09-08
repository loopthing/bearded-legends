import Link from '@components/Link';
import * as HyperlinkStyles from '@components/Link.scss';
import GlobalContent from '@content/Global.yaml';
import useContentBundle from '@hooks/useContentBundle';
import DOM from '@utils/DOM';
import React from 'react';
import Toolbar from '../../components/Toolbar';
import useZoom from '../../hooks/useZoom';
import Logo from '../Logo';
import * as LogoStyles from '../Logo.scss';
import Navigation from '../Navigation/Navigation';
import * as Styles from './About.scss';
import AboutContent from './About.yaml';

export default function App({ className }) {
  const {
    ChatAppLinkUrl,
    ChatAppInvitationLinkUrl,
    ChatAppInvitationMessage,
    ChatAppInvitationLinkLabel,
    ChatAppLinkLabel,
    GuildNameDecorative,
  } = useContentBundle(GlobalContent, AboutContent);

  useZoom();

  return (
    <>
      <div className={DOM.classNames(className, Styles.About)}>
        <Logo className={DOM.classNames(Styles.Logo, LogoStyles.Largest)} />
        <div>
          <p>
            <GuildNameDecorative />
          </p>
        </div>
        <div className={Styles.Chat}>
          <Link href={ChatAppLinkUrl()} className={HyperlinkStyles.Button}>
            <ChatAppLinkLabel />
          </Link>
          <p>
            <ChatAppInvitationMessage />
            <br />
            <Link href={ChatAppInvitationLinkUrl()}>
              <ChatAppInvitationLinkLabel />
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
