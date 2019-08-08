import  {useEffect} from 'react';
import { withRouter } from 'react-router-dom';


const ScrollToTop = ({ children, location: { pathname }}) => {

  function shouldScroll(){
    return true;
  }

  useEffect(() => {
    if(shouldScroll()){
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children || null;


};

export default withRouter(ScrollToTop);
