import SubPageTemplate from '../components/SubPageTemplate';
import { SERVICES } from '../data/services';

export default function WaqfServices() {
  return (
    <SubPageTemplate
      pageId="waqf-services"
      heroKey="waqf"
      serviceData={SERVICES['waqf-services']}
    />
  );
}
