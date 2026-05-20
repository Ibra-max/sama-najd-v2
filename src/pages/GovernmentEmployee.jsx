import SubPageTemplate from '../components/SubPageTemplate';
import { SERVICES } from '../data/services';

export default function GovernmentEmployee() {
  return (
    <SubPageTemplate
      pageId="government-employee"
      heroKey="gov"
      serviceData={SERVICES['government-employee']}
    />
  );
}
