import React from 'react'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async context => {
  const { slug, media }: any = context.params

  return {
    props: {
      media: media,
      slug: slug
    }
  }
}

const Index = () => {
  return (
    <div>
      <div className=""></div>
    </div>
  )
}

export default Index
