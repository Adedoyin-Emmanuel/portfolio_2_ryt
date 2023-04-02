import Head from "next/head";
import { GetStaticProps } from 'next'
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import { Experience, PageInfo, Project, Skill, Social } from "@/typings";
import { fetchPageInfo } from "@/utils/fetchPageInfo";
import { fetchExperiences } from "@/utils/fetchExperiences";
import { fetchSkills } from "@/utils/fetchSkills";
import { fetchProjects } from "@/utils/fetchProjects";
import { fetchSocial } from "@/utils/fetchSocial";
import Image from "next/image";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
  socials: Social[];
};

const Home = ({ pageInfo, experiences, projects, skills, socials }: Props) => {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory
    overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20
    scrollbar-thumb-[#F7AB0A]/80"
    >
      <Head>
        <title>{pageInfo?.name}</title> 
      </Head>

      <Header socials={socials} />

      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>

      <section id="skills" className="snap-center">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-start">
        <Projects projects={projects} />
      </section>

      <section id="contac" className="snap-start">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-evenly">
            <img
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0
          cursor-pointer"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKMAAAB3CAMAAABYHQCLAAAAb1BMVEX///8PEhcAAABxcnT///0AAAr7+/sJDRP4+Pj09PTd3d7Y2Nnk5OWEhYYAAAXu7u/Pz9EABg58fX5AQEG6u7xYWVrDw8QXGBwdHR+cnJ6QkZKnqKlOTlCtra80NTdUVFVnaGpHR0opKiojJCZgYWF5hB9gAAAE1klEQVR4nO2ba3OqPBSFQwxEFAUE652i5f//xpPE7FwQy+n7liRnhudLZ0THZdhrr1woQjMzMzMzMzMz/wLEt4C/YL1Z+pYwSlsFr3FFb74ljHLGwQ9jgjfBu6bGa98Sxkj2rW8Jo2T4w7eEEQjaHUKvRpIdL6FrRDea+ZYwStP6VjBKgQvfEkZZ3IPPmBUOPaoJOuE0dFMnx51vCaNDVG/9RHXyg/d2+5+8+9dI0AJo08F3EAQB3Y/qvFWfnVjlGQOX4Tfk15z/IWhztBvPRX3yPLHGLKKRIN4P976baDiE5I+T9Xp6jZ8fpIep85Es8POrojcZUuGr1GpKISxz4HOLyRvSh/qu3ZC1Vzh6imv25ssEjf22X6Up4Z7lA1eZFLaC4VFtNx5dI9XkCnl6wIAMuCZjv6CsmPjd1fa9+anpwyf7kiOy/exfIqwKuYyaNR77ByQVOKYZGv1fR1fWa44IKdsrGzbb9doxGxcSre/r3ba1uETxqlmYl0zHrJxoXH5u5X179DvdDssbelxb8ldQH7h1IpEnxhvX5EeQwqLa1KgdUzvSmMI3xo194fJOCjQeGjlbJg67hiwh7srKbjy679v5OCWDLmVxV8LLvVmDLFPW9t04hpPsodsdzW7XghRseynDUKZTz8pMbmogjVWVKlNmXqvxnFxGtWKJddYoOdoxbHKbaNckTTxssUlhE1i4rVQNjZogxp8sY2q9UKiHBt2BxoK+2KOwuuZC1yR0AfqVu92gUllTLqVs7ZiETyOZeCIUZY6jWlP323WmMmYnaoE+5Kzi9M0UZFryB7imexbexahQwq9K8WlV2m90yBmGZytck4AUvJeC5fShNt3umF6ZFda9v3OLY9Hf96pMnR8dEnQH18S88MC8ZZOCYOaahK/BpHZ3Ua01Wm1PTxDPSnB5z3VJ0C93Ua3JVQUyM2jzsraYST+xCkwfsrE7m9zaKNew+f+hVFKIsjizT+0lqjXaNefCMu8DVuA47WTRxpWXPTSEOqi1poWovvKoxjEo7hoo0zc7WJOjbiRVk1tu3rbrQGQJa4Sjk1X1C4QkcFMVvCVmuFbi1euedp2JEcUgZSOiGqEDtV6npb8D4lVPS1nwID8bln+ybT05hrPYWlKufMcnZs16HVnivR4QF9Z4iXl21fIy6MwLNPYoEaGj4ZqSb4mtxGIGWa6ZfAP8O3SkKCnyiDC9a/F+olprhGgWGnlUH2SzNlyDO48SOa3SwtKZj6vcRckNjb4PiLVrhHn1ESHMbaPY+wHxEgpP7EN9wJiZ00v3k9s+aiJ2YenY6i1yEE+j4UM7l+TPeQOVUa0vyKB0ug81DGx1i1nDGRuZlz/3hErfjuEUMZg3b6xmLXYdsftV9QBiL0psifWef/uQZzUhwB3MpBDU9Jp1FUf04EdTn2VMKUR1f2/Ua1SbbJ7H5rveTj3Kvsqjz6jWEFQ8o5q+rKt23qNaQlgh8tZ9wy/rqnVATz/W3LxDT/N0/jMGSJZGVJv4WbG+ZXH3rWCULJBm/R0nHE7pvUGsqgOndnS+/98hqLr61jDKKqBm/Y6Nmydi/g95AOuqMQaiOjDYnML/umoMHtVhP8DMVoZV4BK5Y0J/VJ1HdeiOYVHt+nz/56Sb4P+rbGZmZmZmZmbmH+EPhtUzHYXj14cAAAAASUVORK5CYII="
              alt="footer"
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocial();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },

    revalidate: 10,
  };
};