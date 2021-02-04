import { HStack, Link, IconButton } from '@chakra-ui/react'
import { FiInstagram, FiTwitter, FiFacebook, FiTv, FiGlobe } from "react-icons/fi"

import type { Socials } from '../../pages/actions'
import type { Colors } from '../../pages/[url]'

type SocialIcons = {
  [key: string]: JSX.Element
  // instagram: JSX.Element,
  // twitter: JSX.Element,
  // facebook: JSX.Element,
  // video: JSX.Element,
  // website: JSX.Element
}

const PageSocials: React.FunctionComponent<{ socials: Socials, colors: Colors}> = ({ socials, colors }) => {

  const keys = Object.keys(socials).filter(key => {
    if (socials[key].length > 0) return key
  })

  const format: Socials = {
    instagram: `https://instagram.com/${socials.instagram}`,
    twitter: `https://twitter.com/${socials.twitter}`,
    facebook: `https://facebook.com/${socials.facebook}`,
    video: `https://${socials.video}`,
    website: `https://${socials.website}`
  }

  const icons: SocialIcons = {
    instagram: <FiInstagram size={28} />,
    twitter: <FiTwitter size={28} />,
    facebook: <FiFacebook size={28} />,
    video: <FiTv size={28} />,
    website: <FiGlobe size={28} />
  }

  return (
    <HStack p={2} spacing={2}>
      {keys.map(key => (
        <Link key={key} href={format[key]} isExternal>
          <IconButton variant="ghost" icon={icons[key]} aria-label={key} _hover={{ bg: `${colors.socials}`}} color={colors.primary} />
        </Link>
      ))}
    </HStack>
  )
}

export default PageSocials
