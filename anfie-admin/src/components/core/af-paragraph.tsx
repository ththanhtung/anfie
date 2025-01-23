'use client'
import React, { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

type TProps = {
  children: ReactNode,
  i18n?: boolean,
  className?: string,
  heading1?: boolean,
  heading2?: boolean,
  heading3?: boolean,
  heading4?: boolean,
  heading5?: boolean,
  caption?: boolean,
  normal?: boolean,
  medium?: boolean,
  bold?: boolean,
  main?: boolean,
  error?: boolean,
  neutral900?: boolean,
  neutral800?: boolean,
  neutral700?: boolean,
}
const AFParagraph = ({ i18n, children, heading1, heading2, heading3, heading4, heading5,
  caption, className, normal, medium, bold, main, error, neutral900, neutral800, neutral700
}: TProps) => {
  const t = useTranslations();
  return (
    <p className={clsx({
      'heading1': heading1,
      'heading2': heading2,
      'heading3': heading3,
      'heading4': heading4,
      'heading5': heading5,
      'caption': caption,
      '!font-normal': normal,
      '!font-medium': medium,
      '!font-bold': bold,
      '!text-main': main,
      '!text-red_400': error,
      '!text-neutral_900': neutral900,
      '!text-neutral_800': neutral800,
      '!text-neutral_700': neutral700,
    }, className)}>{i18n ? t(children) : children}</p>
  )
}
export default AFParagraph;