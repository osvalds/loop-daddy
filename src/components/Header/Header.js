import { useState } from "react";
import {ReactComponent as Kimono} from "./Icons/kimono.svg";
import {ReactComponent as GitHubLogo} from "./Icons/gh.svg";
import styled, {keyframes} from "styled-components"

const LogoWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  
`

const IconWrapper = styled.div`
  svg {
    width: 100%;
    max-width: 48px;
    height: auto;
    fill: white;
  }
`

const LogoTitle = styled.h1`
  color: white;
  font-weight: bold;
  white-space: nowrap;
  font-size: 18px;
  padding: 0 6px;
  user-select: none;
  flex: 1 0 auto;
`

const MarqueeAnimation = keyframes`
    0% {
        transform: translate3d(var(--move-initial), 0, 0);
    }

    100% {
        transform: translate3d(var(--move-final), 0, 0);
    }
`

const MarqueeLogoWrapper = styled.div`
    position: relative;
    overflow: hidden;
    --offset: 0px;
    --move-initial: calc(-25% + var(--offset));
    --move-final: calc(-75% + var(--offset));
`

const MarqueeInner = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: ${MarqueeAnimation} 5s linear infinite;
    animation-play-state: ${props => props.$running ? "running" : "paused"}
`

const LogoPlaceholder = styled(LogoTitle)`
  position: static;
  opacity: 0;
  color: pink
`

function MarqueeLogo({running}) {
    return (
        <MarqueeLogoWrapper>
            <LogoPlaceholder>Loop Daddy</LogoPlaceholder>
            <MarqueeInner $running={running}>
                <LogoTitle>Loop Daddy</LogoTitle>
                <LogoTitle>Loop Daddy</LogoTitle>
                <LogoTitle>Loop Daddy</LogoTitle>
                <LogoTitle>Loop Daddy</LogoTitle>
            </MarqueeInner>
        </MarqueeLogoWrapper>
    )
}

function Logo() {
    const [running, setIsrunning] = useState(false)
    return (
        <LogoWrapper onClick={() => setIsrunning(r => !r)}>
            <IconWrapper>
                <Kimono/>
            </IconWrapper>
            <MarqueeLogo running={running}/>
        </LogoWrapper>
    )
}

const LinkSectionWrapper = styled.div`
   display: flex;
   align-items: center;
`

const Link = styled.a`
  color: white;
  font-weight: bold;
  margin-right: 12px;
`

function LinkSection() {
    return (
        <LinkSectionWrapper>
            <Link target="_blank"
                  rel="noopener noreferrer"
                  href="https://youtube.com/marcrebillet">
                The Inspiration
            </Link>
            <a target="_blank"
               rel="noopener noreferrer"
               href="https://github.com/osvalds/loop-daddy">
                <GitHubLogo/>
            </a>
        </LinkSectionWrapper>
    )
}

const HeaderWrapper = styled.div`
  padding: 8px 24px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export function Header() {
    return (
        <HeaderWrapper>
            <Logo/>
            <LinkSection/>
        </HeaderWrapper>
    )
}
