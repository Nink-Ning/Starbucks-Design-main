import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function NavbarLogo() {
  return (
    <Link className="navbar__brand" to={useBaseUrl('/')} aria-label="Starbucks Design 首页">
      <img className="navbar__logo-image" src={useBaseUrl('/img/logo-icon.svg')} alt="" />
    </Link>
  );
}
