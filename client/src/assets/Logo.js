import { useSelector } from 'react-redux';
import styled  from 'styled-components';
const Logo = () => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  return (
    <LogoWrapper themeState={themeState}>
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" rx="15" fill="#FEDD89"/>
  <path id='one' d="M7.43133 8H10.5713L11.9713 18.02H12.0113L13.4113 8H16.5513V22H14.4713V11.4H14.4313L12.8313 22H10.9913L9.39133 11.4H9.35133V22H7.43133V8ZM19.893 8H22.873L25.153 22H22.953L22.553 19.22V19.26H20.053L19.653 22H17.613L19.893 8ZM22.293 17.36L21.313 10.44H21.273L20.313 17.36H22.293ZM33.486 8H35.686V22H33.486V8ZM37.3337 8H39.5337V20H43.1537V22H37.3337V8ZM7.86102 26H11.001L12.401 36.02H12.441L13.841 26H16.981V40H14.901V29.4H14.861L13.261 40H11.421L9.82102 29.4H9.78102V40H7.86102V26ZM20.3227 26H23.3027L25.5827 40H23.3827L22.9827 37.22V37.26H20.4827L20.0827 40H18.0427L20.3227 26ZM22.7227 35.36L21.7427 28.44H21.7027L20.7427 35.36H22.7227ZM33.0563 26H35.2563V40H33.0563V26ZM36.904 26H39.104V38H42.724V40H36.904V26Z" fill="#393939"/>
  <path d="M26.2204 8H32.2204V10H28.4204V13.7H31.4404V15.7H28.4204V20H32.2204V22H26.2204V8Z" fill="#FF6C02"/>
</svg>
    </LogoWrapper>

  );
};

const LogoWrapper = styled.div`
rect{
  fill : ${(props)=>props.themeState==='light' ? 'var(--color-yellow)' : 'var(--color-navy )'}
}
#one{
  fill : ${(props)=>props.themeState==='light' ? 'var(--color-gray )' : 'var(--color-white)'}
}
`

export default Logo;
