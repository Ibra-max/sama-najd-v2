import SubPageTemplate from '../components/SubPageTemplate';
import { SERVICES } from '../data/services';

export default function Cash() {
  return (
    <SubPageTemplate
      pageId="cash"
      heroKey="cash"
      serviceData={SERVICES['cash']}
    />
  );
}
