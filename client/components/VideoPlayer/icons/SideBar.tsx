import { Icon } from '.';

export function SideBarOff() {
  return (
    <Icon version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
      <g>
        <path
          d="M2 15V5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2zm2 0V5h7v10H4zm9 0h3V5h-3v10z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </g>
    </Icon>
  );
}

export function SidebarOn() {
  return (
    <Icon version="1.1" viewBox="0 0 20 20" x="0px" y="0px">
      <g>
        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h7V3H4zM16 3h-3v14h3a2 2 0 002-2V5a2 2 0 00-2-2z"></path>
      </g>
    </Icon>
  );
}
