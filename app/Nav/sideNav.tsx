import JakosBalayLogo from "@/lib/svg/JakosBalayLogo";
import {
  Airplane,
  Backpack,
  Book,
  Campfire,
  Chef,
  Coffee,
  Hut,
  Map,
  TreeHammock,
} from "@/lib/svg/NavSVGs";

export default function SideNav({ className }: { className?: string }) {
  const svgClass =
    "fill-current w-16 h-16 m-auto text-blue-800 hover:text-blue-500";
  return (
    <div
      className={className + "flex flex-col gap-8 bg-yellow-400 fixed top-0"}
    >
      <button className="w-full">
        <JakosBalayLogo
          className={
            "text-blue-800 fill-current logo ml-auto mr-auto mt-6 w-28 hover:text-blue-500"
          }
        />
      </button>
      <nav>
        <ul className={"flex flex-col gap-3.5 text-blue-400"}>
          <li>
            <button>
              <Hut className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Map className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Coffee className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Book className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Chef className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Airplane className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Campfire className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <Backpack className={svgClass} />
            </button>
          </li>
          <li>
            <button>
              <TreeHammock className={svgClass} />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
