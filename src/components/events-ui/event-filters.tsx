"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const EventFilters = () => {
    return (
        <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm mb-8">
            <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center">

                <div className="relative flex-grow w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search Events..."
                        className="pl-10 w-full"
                    />
                </div>

                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by Game" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Games</SelectItem>
                        <SelectItem value="valorant">Valorant</SelectItem>
                        <SelectItem value="lol">League of Legends</SelectItem>
                        <SelectItem value="csgo">CS:GO</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="tournament">Tournament</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="casual">Casual Meetup</SelectItem>
                        <SelectItem value="lan">LAN Party</SelectItem>
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date-desc">Date (Newest First)</SelectItem>
                        <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="w-full md:w-auto">
                    Apply Filters
                </Button>

            </div>
        </div>
    );
};

export default EventFilters;
