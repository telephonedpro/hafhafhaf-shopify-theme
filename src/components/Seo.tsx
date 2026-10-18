import { useEffect } from "react";

/** Sets the page title and description (and their social copies). */
export default function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    const set = (sel: string, attr: string, key: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = value;
    };
    set('meta[name="description"]', "name", "description", description);
    set('meta[property="og:title"]', "property", "og:title", title);
    set('meta[property="og:description"]', "property", "og:description", description);
  }, [title, description]);
  return null;
}
