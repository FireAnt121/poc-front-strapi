import { InjectionZone } from '@strapi/helper-plugin';

const HomePage = () => {
  return (
    <main>
      <h1>This is the homepage</h1>
	    <InjectionZone area="content-hierarchy.homePage.right" />
    </main>
  );
};