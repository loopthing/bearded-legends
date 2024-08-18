import Hyperlink from '@components/Hyperlink';
import * as HyperlinkStyles from '@components/Hyperlink.scss';
import content from '@content/Content.yaml';
import useContentBundle from '@hooks/useContentBundle';
import Arrays from '@utils/Arrays';
import React from 'react';
import Toolbar from '../components/Toolbar';
import * as Styles from './About.scss';
import Logo from './Logo';
import * as LogoStyles from './Logo.scss';
import useZoom from '../hooks/useZoom';

export default function App({ className }) {
  const b = useContentBundle(content);

  useZoom();

  return (
    <>
      <div className={Arrays.pack(className, Styles.About).join(' ')}>
        <Logo
          className={Arrays.pack(Styles.Logo, LogoStyles.Largest).join(' ')}
        />
        <div>
          <p>
            <b.GuildNameDecorative />
          </p>
        </div>
        <div className={Styles.Chat}>
          <Hyperlink
            href={b.DISCORD_CHAT_URL()}
            className={HyperlinkStyles.Button}
          >
            <b.ChatAppName />
          </Hyperlink>
          <p>
            <b.ChatAppInvitationLabel_1 />
            <br />
            <Hyperlink href={b.DISCORD_JOIN_URL()}>
              <b.ChatAppInvitationLabel_2 />
            </Hyperlink>
          </p>
        </div>
      </div>

      <Toolbar>
        <Hyperlink className={HyperlinkStyles.Button} href="/war-timer">
          <b.WarTimerAppName />
        </Hyperlink>

        <Hyperlink className={HyperlinkStyles.Button} href="/settings">
          <b.SettingsAppName />
        </Hyperlink>
      </Toolbar>
    </>
  );
}
