# cti-stix-diamond-activity-attack-graph

This is an Open Source tool for visualizing [STIX](https://oasis-open.github.io/cti-documentation/stix/intro.html) 2.1 content in an

1. Attack Graph and 
2. Activity Thread Graph 

by applying [The Diamond Model of Intrusion Analysis](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf) methodology as well as Tactics (Phases), Techniques and Procedures (TTP) from the [MITRE ATT&CK v8.2](https://attack.mitre.org/) framework. More precisely the Attack Graph aims to provide a graphical representation of a known attack scenario sourced by some adversary (Threat Actor) whereas the Activity Thread Graph represents the local findings. Attack Graph and Activity Thread Graph both have a main graph and one or more sub-graphs, depending on the amount of Techniques available. Sub-graphs are shown up by clicking on the individual Technique object. 

The goal with this tool is to help a Cyber Threat Hunter (Cyber Security Analyst) in building complete visibilty to an attack scenario after consuming primarily Strategic and Operational Threat Intelligence reports but also limited Tactical Threat Intelligence feeds and representing the gathered Intelligence in the Attack Graph. This helps him/her in getting an understanding of how the adversary operated the cyber threat campaign in order to defend against it. The Activity Thread Graph allows to chain locally identified attacker activity and visualize it in a timeline.

The tool is implemented in the [HTML 5 Boilerplate](https://html5boilerplate.com/) framework. The complete visualization
is built with [d3.js](https://d3js.org/), a Javascript library for document manipulation, and all is processed in the
browser without requiring a server (backend).

To use this tool as planned, some specific requirements related to STIX 2.1 objects, which are shown below, MUST be fulfilled.

## Quick access

To get a quick impression on the output and functionalities of the tool visit https://yukh1402.github.io/cti-stix-diamond-activity-attack-graph/ and load the following partial Ryuk Ransomware scenario example
[STIX 2.1](https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph/tree/main/example/example-bundle.json) bundle into the Attack Graph of the tool. You can use this URL for leveraging the online version of this tool.

If you want to deploy your own application instance we recommend to setup a docker container. The docker [image](https://hub.docker.com/r/1402/cti-stix-diamond-activity-attack-graph) is available on Docker Hub. For activating the image and mounting it to port 80 in your own environment, enter the following command on your docker system:

```
docker run -d -p 80:80 1402/cti-stix-diamond-activity-attack-graph:latest
```

## Graph types

In this tool, STIX objects are visually represented by simply providing a STIX 2.1 Bundle. Depending on the graph selection, STIX information
will be displayed in an Attack or Activity Thread Graph. An Attack Graph is timeless and shows multiple Techniques in context of the MITRE ATT&CK Matrix for Enterprise. The Activity Thread Graph takes the timestamp of local findings into account and generates a correlated Timeline-Technique graph. By selecting a Technique the corresponding Sub-Graph with all the related STIX objects will appear.

### Attack Graph

![Attack Graph](https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph/blob/main/doc/images/Attack_graph.PNG)

### Activity Thread Graph
                        
![Activity Thread Graph](https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph/blob/main/doc/images/Activity_graph.PNG)

### Sub-Graph

![Sub-Graph](https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph/blob/main/doc/images/Sub_graph.PNG)

## How to use the tool?

Notice: This tool is Chrome (Browser) optimized.

The STIX Bundle MUST have a structured schema with at least one or multiple STIX Domain Objects (SDO) of type Grouping. All other SDOs, STIX Relationship Objects (SROs) and STIX Cyber-observable Objects (SCOs) that are related or employed in the same context will be referenced via id in the `` "object_refs" `` field of the associated Grouping SDO.

For providing a valid STIX Bundle schema that can be processed in the tool, three requirements are necessary:

1. Each Grouping SDO MUST have one Attack Pattern SDO reference. The Attack Pattern SDO schema is derived from the
   MITRE ATT&CK framework and can be found on the
   [MITRE CTI](https://github.com/mitre/cti/tree/master/enterprise-attack/attack-pattern) repository or pulled from the
   [MITRE ATT&CK TAXII Server](https://github.com/mitre/cti/blob/master/USAGE.md#access-from-the-attck-taxii-server). See example below:
   ````
    {
    "id": "bundle--70d2c497-5717-5a3a-8b03-d2c1f74df433",
    "type": "bundle",
    "objects": [
      {
        "id": "grouping--b5df7982-fb4f-4f73-aac8-c8e22dd8f76d",
        "context": "Test",
        "object_refs": [
            "attack-pattern--b99dc28b-b1bc-41f1-b707-b1b50a2118ea"
        ],
        "type": "grouping",
        "spec_version": "2.1",
        "created": "2021-04-18T06:18:03.030108Z",
        "modified": "2021-04-18T06:18:03.030108Z",
        "revoked": false
      },
      {
        "id": "attack-pattern--b99dc28b-b1bc-41f1-b707-b1b50a2118ea",
        "name": "Spearphishing Attachment",
        "type": "attack-pattern",
        "created": "2020-03-02T19:05:18.137Z",
        "revoked": false,
        "modified": "2020-10-18T01:52:25.316Z",
        "description": "Adversaries may send spearphishing emails with a malicious attachment in an attempt to gain access to victim systems. Spearphishing attachment is a specific variant of spearphishing. Spearphishing attachment is different from other forms of spearphishing in that it employs the use of malware attached to an email. All forms of spearphishing are electronically delivered social engineering targeted at a specific individual, company, or industry. In this scenario, adversaries attach a file to the spearphishing email and usually rely upon [User Execution](https://attack.mitre.org/techniques/T1204) to gain execution.\n\nThere are many options for the attachment such as Microsoft Office documents, executables, PDFs, or archived files. Upon opening the attachment (and potentially clicking past protections), the adversary's payload exploits a vulnerability or directly executes on the user's system. The text of the spearphishing email usually tries to give a plausible reason why the file should be opened, and may explain how to bypass system protections in order to do so. The email may also contain instructions on how to decrypt an attachment, such as a zip file password, in order to evade email boundary defenses. Adversaries frequently manipulate file extensions and icons in order to make attached executables appear to be document files, or files exploiting one application appear to be a file for a different one.",
        "spec_version": "2.1",
        "kill_chain_phases": [
          {
            "phase_name": "initial-access",
            "kill_chain_name": "mitre-attack"
          }
        ],
        "external_references": [
          {
            "external_id": "T1566.001",
            "source_name": "mitre-attack"
          }
        ]
      }
    ]
   }
    ````
2. All STIX objects (SDOs, SROs, SCOs) which are considered in the same context MUST belong to one Grouping SDO. The references of these objects will be registered in the `` "object_refs" `` field of the Grouping SDO. SROs that are in the same context MUST be registered in the `` "object_refs" `` field as well.
   ````
   {
    "id": "bundle--70d2c497-5717-5a3a-8b03-d2c1f74df433",
    "objects": [
      {
        "id": "grouping--b5df7982-fb4f-4f73-aac8-c8e22dd8f76d",
        "context": "Test",
        "object_refs": [
            "attack-pattern--b5d88165-5de1-4b36-94b3-a7b272256088",
            "malware--beab30f1-4219-4efb-a533-0ae1a2aa1c6b",
            "tool--736dcf51-f123-434b-9a34-08208e856c94",
            "threat-actor--8f82ccac-ff89-4307-9661-547aaa4eaa77",
            "infrastructure--dc7e9a67-4667-4c75-b5d0-776b54c54ced",
            "relationship--e9966e1b-1574-474b-a2b4-cfe0ccac1cc2",
            "relationship--74654ae6-42b9-48cb-b6c1-390b6f844acf"
        ],
        "type": "grouping",
        "spec_version": "2.1",
        "created": "2021-04-18T06:18:03.030108Z",
        "modified": "2021-04-18T06:18:03.030108Z",
        "revoked": false
      },
      {
        "id": "attack-pattern--b5d88165-5de1-4b36-94b3-a7b272256088",
        "name": "System Network Configuration Discovery",
        "type": "attack-pattern",
        "created": "2017-05-31T21:30:27.342Z",
        "revoked": false,
        "modified": "2020-03-15T00:55:33.136Z",
        "description": "Adversaries may look for details about the network configuration and settings of systems they access or through information discovery of remote systems. Several operating system administration utilities exist that can be used to gather this information. Examples include [Arp](https://attack.mitre.org/software/S0099), [ipconfig](https://attack.mitre.org/software/S0100)/[ifconfig](https://attack.mitre.org/software/S0101)
        , [nbtstat](https://attack.mitre.org/software/S0102),
        and [route](https://attack.mitre.org/software/S0103).\n\nAdversaries may use the information
        from [System Network Configuration Discovery](https://attack.mitre.org/techniques/T1016) during automated discovery to
        shape follow-on behaviors, including whether or not the adversary fully infects the target and/or attempts specific
        actions.",
        "spec_version": "2.1",
        "kill_chain_phases": [
          {
            "phase_name": "discovery",
            "kill_chain_name": "mitre-attack"
          }
        ],
        "external_references": [
          {
            "external_id": "T1016",
            "source_name": "mitre-attack"
          }
        ]
      },
      {
        "id": "malware--beab30f1-4219-4efb-a533-0ae1a2aa1c6b",
        "name": "Emotet",
        "type": "malware",
        "created": "2021-04-18T05:52:49.754214Z",
        "revoked": false,
        "modified": "2021-04-18T05:52:49.754214Z",
        "is_family": true,
        "capabilities": [
            "anti-disassembly",
            "anti-emulation"
        ],
        "spec_version": "2.1",
        "malware_types": [
            "backdoor",
            "bot"
        ]
      },
      {
        "id": "tool--736dcf51-f123-434b-9a34-08208e856c94",
        "name": "schtasks",
        "type": "tool",
        "created": "2021-04-18T05:52:49.759204Z",
        "revoked": false,
        "modified": "2021-04-18T05:52:49.759204Z",
        "tool_types": [
            "exploitation"
        ],
        "spec_version": "2.1"
      },
      {
        "id": "threat-actor--8f82ccac-ff89-4307-9661-547aaa4eaa77",
        "name": "Wizard Spider",
        "type": "threat-actor",
        "goals": [
            "trying to steal info"
        ],
        "roles": [
            "director"
        ],
        "created": "2021-04-18T05:52:49.765003Z",
        "revoked": false,
        "modified": "2021-04-18T05:52:49.765003Z",
        "spec_version": "2.1",
        "x_target_industry": [
            "government-national"
        ],
        "primary_motivation": "dominance",
        "threat_actor_types": [
            "activist",
            "nation-state"
        ],
        "secondary_motivations": [
            "organizational-gain"
        ]
      },
      {
        "id": "infrastructure--dc7e9a67-4667-4c75-b5d0-776b54c54ced",
        "name": "Infrastructure",
        "type": "infrastructure",
        "created": "2021-04-18T05:52:49.766474Z",
        "revoked": false,
        "modified": "2021-04-18T05:52:49.766474Z",
        "spec_version": "2.1",
        "infrastructure_types": [
            "phishing"
        ]
      },
      {
        "id": "relationship--e9966e1b-1574-474b-a2b4-cfe0ccac1cc2",
        "type": "relationship",
        "created": "2021-04-18T05:56:30.51424Z",
        "revoked": false,
        "modified": "2021-04-18T05:56:30.51424Z",
        "spec_version": "2.1",
        "source_ref": "infrastructure--dc7e9a67-4667-4c75-b5d0-776b54c54ced",
        "relationship_type": "consist-of",
        "target_ref": "malware--beab30f1-4219-4efb-a533-0ae1a2aa1c6b"
      },
      {
        "id": "relationship--74654ae6-42b9-48cb-b6c1-390b6f844acf",
        "type": "relationship",
        "created": "2021-04-18T05:56:30.514686Z",
        "revoked": false,
        "modified": "2021-04-18T05:56:30.514686Z",
        "spec_version": "2.1",
        "source_ref": "threat-actor--8f82ccac-ff89-4307-9661-547aaa4eaa77",
        "relationship_type": "uses",
        "target_ref": "tool--736dcf51-f123-434b-9a34-08208e856c94"
      }
    ],
    "type": "bundle"
    }

   ````
3. Relationships (SROs) between Grouping SDOs MUST NOT be registered in the `` "object_refs" `` field of the Grouping SDO.
   They MUST appear as individual objects inside the bundle `` "objects" ``.

     ````
   {
    "id": "bundle--70d2c497-5717-5a3a-8b03-d2c1f74df433",
    "objects": [
      {
        "id": "grouping--e1e278ff-671d-44e1-add5-42be17562663",
        "context": "Test1",
        "object_refs": [
            ...
        ],
        "type": "grouping",
        "spec_version": "2.1",
        "created": "2021-04-18T06:18:03.030108Z",
        "modified": "2021-04-18T06:18:03.030108Z",
        "revoked": false
      },
      {
        "id": "grouping--b5df7982-fb4f-4f73-aac8-c8e22dd8f76d",
        "context": "Test2",
        "object_refs": [
            ...
        ],
        "type": "grouping",
        "spec_version": "2.1",
        "created": "2021-04-18T06:18:03.030108Z",
        "modified": "2021-04-18T06:18:03.030108Z",
        "revoked": false
      },
      {
        "id": "relationship--74654ae6-42b9-48cb-b6c1-390b6f844acf",
        "type": "relationship",
        "created": "2021-04-18T05:56:30.514686Z",
        "revoked": false,
        "modified": "2021-04-18T05:56:30.514686Z",
        "spec_version": "2.1",
        "source_ref": "grouping--e1e278ff-671d-44e1-add5-42be17562663",
        "relationship_type": "uses",
        "target_ref": "grouping--b5df7982-fb4f-4f73-aac8-c8e22dd8f76d"
      }
    ],
    "type": "bundle"
    }

   ````

## Contribute

In order to contribute to this project please contact the MAINTAINER [Yusuf Khan](https://github.com/yukh1402) under
following email address ykhan@rukhsarkhan.de .

## LICENSE

Copyright (c) 2021 Yusuf Khan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

This copyright notice and this permission notice SHALL be included in all copies or substantial portions of the
Software.

The source code responsible for displaying the cti-stix-diamond-activity-attack-graph project watermark that links back
to https://github.com/yukh1402/cti-stix-diamond-activity-attack-graph
as part of rendered diagrams MUST NOT be removed or changed. When this software is being used in a website or
application,the watermark MUST stay fully visible and MUST NOT visually overlapped by other elements.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
