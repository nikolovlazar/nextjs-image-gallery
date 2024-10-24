import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getResults from '../../utils/cachedImages';
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder';
import type { ImageProps } from '../../utils/types';

const Home: NextPage = ({ currentPhoto }: { currentPhoto: ImageProps }) => {
  const router = useRouter();
  const { photoId } = router.query;

  const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1024/${process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER}/${photoId}.jpg`;

  return (
    <>
      <Head>
        <title>Next.js Conf 2022 Photos</title>
        <meta property='og:image' content={currentPhotoUrl} />
        <meta name='twitter:image' content={currentPhotoUrl} />
      </Head>
      <main className='mx-auto max-w-[1960px] p-4'>
        <img src={currentPhotoUrl} alt={currentPhoto.public_id} />
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = await getResults();

  let reducedResults: ImageProps[] = [];
  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      height: result.height,
      width: result.width,
      public_id: result.filename,
      format: result.format,
    });
    i++;
  }

  const currentPhoto = reducedResults.find(
    (img) => img.public_id === context.params.photoId
  );
  currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

  return {
    props: {
      currentPhoto: currentPhoto,
    },
  };
};
