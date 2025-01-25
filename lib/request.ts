
// @ts-ignore
import parser from 'xml2json';

const PSS_HOST = 'https://api.pixelstarships.com';

export default (() => {
  async function get(service : string, command : string, params : Record<string, string>) : Promise<any> {

    const qs = Object.entries(params).reduce((acc, [k, v]) => {
      const qspart = encodeURIComponent(k) + '=' + encodeURIComponent(v);
      if (acc == "") {
        return qspart;
      } else {
        return acc + '&' + qspart;
      }
    }, "");
    const uri = `${PSS_HOST}/${service}/${command}?${qs}`;
    const res = await fetch(uri);
    if (res.ok) {
      try {
        const body = await res.text();
        console.log(body);
        return JSON.parse(parser.toJson(body))[service][command];
      }catch (err : any) {
        return err;
      }
    } else {
      return { ERR: res.status }
    }
  };
  async function post(service : string, command : string, params : any) : Promise<any> {

    const uri = `${PSS_HOST}/${service}/${command}`
    const res = await fetch(uri, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });
    if (res.ok) {
      try {
        const body = await res.text();
        console.log(body);
        return JSON.parse(parser.toJson(body));
      }catch (err : any) {
        console.log("OOPS");
        return err;
      }
    } else {
      return { ERR: res.status }
    }
  }
  return {
    get,
    post
  }
})();


