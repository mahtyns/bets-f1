

import { mainPageContent } from '../../../content/main'
import Link from '../../atoms/Link';
const HeaderLinks = () => {
    return (
        <div className="header__links">
            {mainPageContent.navbar.links.map((link, i) => <Link key={link.linkName + i} linkUrl={link.linkUrl} linkName={link.linkName} external={false} />)}
        </div>
    )
}

export default HeaderLinks