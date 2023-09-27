import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import axios from "axios";
import Image from "next/image";

const SupportPage = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setEmail(user.emailAddresses[0].emailAddress);
    }
  }, [user]);
  const handleSubmit = async () => {
    const divElement = document.getElementById("topic_select_div");
    const selectElement = divElement?.getElementsByTagName("select")[0];
    const topic = selectElement?.value;
    if (!email || !question || !topic) {
      setLoading(true);
      toast.error("Please fill all the fields.");
      setTimeout(() => {
        setLoading(false);
        toast.dismiss();
      }, 2000);
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      const res = await axios.post("/api/support", {
        email,
        question,
        topic,
      });
    };
    const myPromise = fetchData();
    await toast.promise(myPromise, {
      loading: "Creating a support request...",
      success: "Support request created successfully.",
      error: "Error! Please try again.",
    });
    setLoading(false);
    setQuestion("");
  };
  return (
    <section className="py-12 flex justify-center items-center">
      <Card className="lg:md:sm:w-3/4 w-full p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Support Request</h1>

        </div>
        <div>
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="username">
                <span className="flex items-center space-x-1">
                  <p>Username</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="cursor-help" size={12} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Your support request is linked to your account&apos;s
                          username.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </Label>
              <Input
                type="text"
                id="username"
                value={user?.username as string}
                disabled
                className="cursor-not-allowed"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="email">
                <span className="flex items-center space-x-1">
                  <p>Email</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="cursor-help" size={12} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-center">
                          This is the email you used to sign up.
                          <br />
                          Change it here incase you wish to hear back to another
                          email.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              id="topic_select_div"
              className="grid w-full items-center gap-1.5 py-4"
            >
              <Label htmlFor="topic">Topic</Label>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="content">Problem With Content</SelectItem>
                  <SelectItem value="bug">Security Bug</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="question">Questions/Feedback</SelectItem>
                  <SelectItem value="privacy">Privacy Concerns</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Label htmlFor="message-2">Your Message</Label>
              <Textarea
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your message here."
                id="message-2"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 py-4">
              <Button disabled={loading} onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </form>
        </div>

      </Card>
    </section>
  );
};

export default SupportPage;
