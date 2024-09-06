import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
import GlobalContent from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
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
      <div className={Arrays.pack(className, Styles.About).join(' ')}>
        <Logo
          className={Arrays.pack(Styles.Logo, LogoStyles.Largest).join(' ')}
        />
        <div>
          <p>
            <GuildNameDecorative />
          </p>
        </div>
        <div className={Styles.Chat}>
          <Hyperlink href={ChatAppLinkUrl()} className={HyperlinkStyles.Button}>
            <ChatAppLinkLabel />
          </Hyperlink>
          <p>
            <ChatAppInvitationMessage />
            <br />
            <Hyperlink href={ChatAppInvitationLinkUrl()}>
              <ChatAppInvitationLinkLabel />
            </Hyperlink>
          </p>
        </div>
      </div>

      <Toolbar>
        <Navigation />
      </Toolbar>
    </>
  );
}
