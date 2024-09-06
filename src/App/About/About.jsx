import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
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
import GlobalContent from '@content/Content.yaml';

export default function App({ className }) {
  const {
    CHAT_URL,
    CHAT_INVITATION_URL,
    ChatAppInvitationLabel,
    ChatAppInvitationLink,
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
          <Hyperlink href={CHAT_URL()} className={HyperlinkStyles.Button}>
            <ChatAppLinkLabel />
          </Hyperlink>
          <p>
            <ChatAppInvitationLabel />
            <br />
            <Hyperlink href={CHAT_INVITATION_URL()}>
              <ChatAppInvitationLink />
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
