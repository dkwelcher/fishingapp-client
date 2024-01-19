import Logo from "../assets/logo.png";
import LargemouthBass from "../assets/largemouth-bass.png";
import ChannelCatfish from "../assets/channel-catfish.png";

function Layout() {
  return (
    <>
      <div className="bg-hero-image bg-cover bg-center h-[80vh] p-4 font-paragraph font-medium">
        <nav>
          <header className="flex justify-between">
            <div className="flex pl-8 justify-center items-center">
              <a href="#">
                <img
                  className="size-14"
                  src={Logo}
                  alt="Man fishing in a row boat"
                />
              </a>
              <a className="hover:no-underline" href="#">
                <h2 className="text-5xl pl-2 text-white font-cursive font-black">
                  Fishing App
                </h2>
              </a>
            </div>
            <div className="flex items-center">
              <a
                className="hover:no-underline text-white text-2xl hover:text-blue-700"
                href="#"
              >
                <p>Sign up</p>
              </a>
              <a
                className="hover:no-underline text-white text-2xl hover:text-blue-700 px-6"
                href="#"
              >
                <p>Log in</p>
              </a>
            </div>
          </header>
        </nav>
        <div className="flex flex-col justify-center items-center h-4/5">
          <h1 className="w-3/6 text-center font-title font-bold text-8xl leading-normal text-white text-shadow">
            Track your catches & fishing adventures
          </h1>
          <a
            className="px-6 py-4 border border-solid border-white rounded-2xl hover:no-underline text-white text-2xl hover:bg-white hover:text-gray-900"
            href="#"
          >
            Get Started
          </a>
        </div>
      </div>
      <main>
        <div className="pt-32 pb-0 px-[20%]">
          <div className="flex">
            <img
              className="w-full h-full rounded-2xl"
              src={LargemouthBass}
              alt="Largemouth bass suspended by a submerged log and vegetation"
            />
            <div className="pl-24">
              <h2 className="text-5xl font-paragraph font-semibold">
                What is <span className="text-blue-700">Fishing App?</span>
              </h2>
              <p className="text-zinc-600 pt-4 text-xl font-paragraph font-medium">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
                laboriosam eveniet molestias, error natus, repellat itaque
                accusamus doloremque quasi repellendus dolorem commodi tempora
                quia similique odio hic autem pariatur unde odit enim fuga atque
                aperiam? Omnis fugiat sapiente, quae nostrum doloribus maxime
                necessitatibus animi, et dicta labore debitis ipsa fugit.
                Quaerat ad alias cumque incidunt, ipsum minus debitis nulla
                neque hic eligendi inventore totam, adipisci expedita
                reprehenderit explicabo quasi culpa quis eius? Officiis, dolorum
                cumque? Placeat alias sequi iure corporis esse doloribus minima
                repellat ipsam nihil, non possimus laudantium rerum laborum ea
                temporibus quisquam totam numquam, dolore, dolor cumque quae?
              </p>
            </div>
          </div>
        </div>
        <div className="pt-32 pb-0 px-[20%]">
          <div className="flex">
            <div className="pr-24">
              <h2 className="text-5xl font-paragraph font-semibold">
                Lorem ipsum dolor sit amet.
              </h2>
              <p className="text-zinc-600 pt-4 text-xl font-paragraph font-medium">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                totam fugit rerum. Nobis officiis fugiat deleniti libero
                cupiditate voluptatibus maiores necessitatibus ex similique
                obcaecati voluptatem doloribus omnis itaque, maxime ad
                repudiandae cumque rerum et optio ipsa vero dolorem amet. Odit,
                et consectetur placeat blanditiis impedit ducimus voluptatibus
                facere quidem repellendus dicta iste odio eum deleniti
                laudantium culpa illo quas porro similique consequuntur ipsum!
                Eligendi, quos quaerat fuga iusto suscipit assumenda officiis
                consectetur impedit cupiditate consequatur. Eius commodi odit
                aliquam quis, quia maiores cum impedit molestias ad nemo itaque
                est atque officia. Debitis mollitia quisquam voluptate optio
                perspiciatis, repellat totam possimus.
              </p>
            </div>
            <img
              className="w-full h-full rounded-2xl"
              src={ChannelCatfish}
              alt="Largemouth bass suspended by a submerged log and vegetation"
            />
          </div>
        </div>
        <div className="flex bg-callout-image bg-cover bg-center h-[1000px] mt-32 justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="w-7/12 pb-8 text-center text-7xl text-white text-shadow leading-normal font-paragraph font-semibold">
              Record & access your catches to improve your fishing journeys
            </h1>
            <a
              className="px-6 py-4 border-4 border-solid border-white rounded-2xl hover:no-underline text-5xl font-paragraph font-medium text-white text-shadow bg-transparent-shadow hover:bg-blue-700"
              href="#"
            >
              Sign up now
            </a>
          </div>
        </div>
      </main>
      <footer className="flex h-[200px] justify-center items-center text-xl font-paragraph font-medium">
        <div>Team 16 &copy; 2023</div>
      </footer>
    </>
  );
}

export default Layout;
