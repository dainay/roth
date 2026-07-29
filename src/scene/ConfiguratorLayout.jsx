import Scene from "./Scene";
import UI from "../ui/UI";
import s from './ConfiguratorLayout.module.scss'


export default function ConfiguratorLayout() {
  return (
    <div className={s.configuratorLayout}>
        <UI />
        <Scene />
    </div>
  );
}