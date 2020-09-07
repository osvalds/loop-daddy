import React from "react";
import {ReactComponent as Kimono} from "./Icons/kimono.svg";
import {ReactComponent as Boxers} from "./Icons/boxers.svg";
import {ReactComponent as Loop} from "./Icons/loop.svg";
import {ReactComponent as Moustache} from "./Icons/moustache.svg";
import {ReactComponent as GitHubLogo} from "./Icons/gh.svg";
import styled from "styled-components"

const LogoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
  margin: 4px 0;
  max-width: 64px;  
`

const IconWrapper = styled.div`
  svg {
    width: 100%;
    height: auto;
    fill: white;
  }
`

function Logo() {
    return (
        <LogoWrapper>
            <IconWrapper>
                <Loop/>
            </IconWrapper>
            <IconWrapper>
                <Kimono/>
            </IconWrapper>
            <IconWrapper>
                <Boxers/>
            </IconWrapper>
            <IconWrapper>
                <Moustache/>
            </IconWrapper>
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
  padding: 0 24px;
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
